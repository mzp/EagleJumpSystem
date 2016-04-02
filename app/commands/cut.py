import os
import tempfile
import threading
import db.panels
import commands
from images.cut import Cut

def run(id, volume, images):
    logger = commands.get_logger(__name__, threading.get_ident())
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
    (fd, path) = tempfile.mkstemp(prefix='ejs')
    storage.save(path)
    socket = os.fdopen(fd,'w')
    socket.close()
    return (storage.filename, path)

def start(id, volume, images):
    xs = list(map(read, images))
    thread = threading.Thread(
            target=run,
            name=__name__,
            args=(id, volume, xs))
    thread.start()
    return thread.ident
