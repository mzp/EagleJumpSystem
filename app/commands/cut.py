import threading
import logging
from pathlib import Path

root = Path('./log')

def path_for(ident):
    return root / '{0}.log'.format(ident)

def get_logger(ident):
    path = path_for(ident)

    formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(name)s - %(message)s')

    logger = logging.getLogger(__name__)
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

def run(_):
    logger = get_logger(threading.get_ident())
    logger.info('cut start')

def start():
    thread = threading.Thread(target=run, name=__name__, args=(None,))
    thread.start()
    return thread.ident

def show(ident):
    with open(path_for(ident).as_posix(), "r") as file:
        return file.read()
