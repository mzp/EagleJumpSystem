import db.panels
import threading
import tempfile
import logging
from pathlib import Path
from images.cut import Cut

root = Path('./log')

def path_for(ident):
    return root / '{0}.log'.format(ident)

def get_logger(ident):
    path = path_for(ident)

    formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(name)s - %(message)s')

    logger = logging.getLogger(__name__ + '.' + str(ident))

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

def run(id, volume, images):
    logger = get_logger(threading.get_ident())
    try:
        logger.info('Cut {0} {1}'.format(id, volume))

        cut = Cut()

        for (filename, path) in images:
            logger.info('statistics: {0}'.format(filename))
            cut.statistics(path)

        for (filename, path) in images:
            logger.info('crop: {0}'.format(filename))

            for i, image in enumerate(cut.crop(path)):
                logger.info('found: {0} -> {1}'.format(filename, i))
                db.panels.update(id, volume, filename, i, image)

    except Exception as e:
        logger.exception(e)

def read(storage):
    (_, path) = tempfile.mkstemp(prefix='ejs')
    storage.save(path)
    return (storage.filename, path)

def start(id, volume, images):
    xs = list(map(read, images))
    thread = threading.Thread(
            target=run,
            name=__name__,
            args=(id, volume, xs))
    thread.start()
    return thread.ident

def show(ident):
    with open(path_for(ident).as_posix(), "r") as file:
        return file.read()
