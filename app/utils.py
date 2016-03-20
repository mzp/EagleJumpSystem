def find(xs, f):
    for x in xs:
        if f(x):
            return x
    return None

def is_empty(key):
    def f(panel):
        return key not in panel['metadata'] or panel['metadata'][key] == ''
    return f

def next(xs, f):
    ys = xs[1:]
    for (x,y) in zip(xs,ys):
        if f(x):
            return y
    return None


