from pathlib import Path
import logging

root = Path('./log')

def get_logger(name, ident):
    path = path_for(ident)

    formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(name)s - %(message)s')

    logger = logging.getLogger(name + '.' + str(ident))

    # HACK: clear old handlers
    logger.handlers = []

    sh = logging.StreamHandler()
    sh.setLevel(logging.DEBUG)
    sh.setFormatter(formatter)

    fh = logging.FileHandler(path.as_posix(), mode='w')
    fh.setLevel(logging.DEBUG)
    fh.setFormatter(formatter)

    logger.setLevel(logging.DEBUG)
    logger.addHandler(sh)
    logger.addHandler(fh)

    return logger

def path_for(ident):
    return root / '{0}.log'.format(ident)

def show(ident):
    with open(path_for(ident).as_posix(), "r") as file:
        return file.read()
