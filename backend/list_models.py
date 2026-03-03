import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
key = os.getenv('GEMINI_CHUNKER_API_KEY')
if key:
    genai.configure(api_key=key)

models = genai.list_models()
print('available model count', len(models))
for m in models[:30]:
    print(m['name'], '->', m.get('capabilities'))
