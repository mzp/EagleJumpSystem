import json
from pathlib import Path

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Path):
            return obj.as_posix()
        return json.JSONEncoder.default(self, obj)
