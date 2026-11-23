from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import requests,json,re
out=Path('reference-data/modules');out.mkdir(exist_ok=True)
urls=json.loads(Path('reference-data/module-urls.json').read_text())
def dl(u):
 p=out/u.split('/')[-1]
 try:
  t=requests.get(u,timeout=60).text;p.write_text(t)
  return p.name,sorted(set(re.findall(r'from[ ]?"([^\"]+)"',t)))
 except Exception as e:return u,str(e)
with ThreadPoolExecutor(max_workers=8) as ex:r=list(ex.map(dl,[u for u in urls if 'framerusercontent' in u]))
print(json.dumps(r,indent=2))
