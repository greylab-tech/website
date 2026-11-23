from pathlib import Path
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor
import requests, json, re, html
from bs4 import BeautifulSoup
BASE='https://atlasdesign.framer.ai'
OUT=Path('reference-data')
OUT.mkdir(exist_ok=True)
sitemap=BeautifulSoup((OUT/'sitemap.xml').read_text(),'xml')
urls=[x.text for x in sitemap.find_all('loc')]
def fetch_page(url):
    route=urlparse(url).path.strip('/')
    path=OUT/((route.replace('/','--') or 'home')+'.html')
    if not path.exists():
        r=requests.get(url,timeout=45);r.raise_for_status();path.write_text(r.content.decode("utf-8"))
    return url,path
with ThreadPoolExecutor(max_workers=6) as ex: pages=list(ex.map(fetch_page,urls))
previous_manifest=OUT/'asset-manifest.json'
preferred_paths={a['url']:a['path'] for a in json.loads(previous_manifest.read_text())} if previous_manifest.exists() else {}
manifest={}
page_data=[]
for url,path in pages:
    text=path.read_text();s=BeautifulSoup(text,'html.parser')
    image_data=[]
    for img in s.find_all('img'):
        src=img.get('src','');clean=src.split('?')[0]
        if not clean.startswith('http'):continue
        link=img.find_parent('a');parents=[p.get('data-framer-name') for p in img.parents if p.get('data-framer-name')]
        image_data.append({'src':src,'alt':img.get('alt'),'parents':parents[:6],'link':link.get('href') if link else None})
        manifest.setdefault(clean,{'url':clean,'kind':'image','path':preferred_paths.get(clean, '/images/'+urlparse(clean).path.split('/')[-1]),'pages':[]})['pages'].append(url)
    for font_url in set(re.findall(r'https://[^\s"\)<>]+\.(?:woff2|woff|ttf)',text)):
        font_url=html.unescape(font_url)
        manifest.setdefault(font_url,{'url':font_url,'kind':'font','path':'/fonts/'+urlparse(font_url).path.split('/')[-1],'pages':[]})['pages'].append(url)
    for video_url in set(re.findall(r'https://[^\s"\)<>]+\.(?:mp4|webm)',text)):
        manifest.setdefault(video_url,{'url':video_url,'kind':'video','path':'/videos/'+urlparse(video_url).path.split('/')[-1],'pages':[]})['pages'].append(url)
    blocks=[]
    for e in s.select('[data-framer-component-type="RichTextContainer"]'):
        blocks.append({'text':e.get_text(' ',strip=True),'html':str(e),'parents':[p.get('data-framer-name') for p in e.parents if p.get('data-framer-name')][:4]})
    page_data.append({'url':url,'file':str(path),'images':image_data,'text':blocks,'title':s.title.text if s.title else ''})
(OUT/'pages.json').write_text(json.dumps(page_data,indent=2))
(OUT/'asset-manifest.json').write_text(json.dumps(list(manifest.values()),indent=2))
def download(asset):
    path=Path('public'+asset['path']);path.parent.mkdir(exist_ok=True,parents=True)
    if not path.exists():
        try:
            r=requests.get(asset['url'],timeout=60);r.raise_for_status();path.write_bytes(r.content)
        except Exception as e:return {'url':asset['url'],'error':str(e)}
    return {'path':str(path),'size':path.stat().st_size}
with ThreadPoolExecutor(max_workers=8) as ex: results=list(ex.map(download,manifest.values()))
(OUT/'download-results.json').write_text(json.dumps(results,indent=2))
print(json.dumps({'pages':len(pages),'assets':len(manifest),'errors':[r for r in results if 'error' in r]},indent=2))
