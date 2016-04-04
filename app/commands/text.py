import commands
import db.metadata
import images.text
import threading

def run(panels):
    logger = commands.get_logger(__name__, threading.get_ident())
    try:
        logger.info('Text detection')
        paths = map(lambda panel: panel['path'].as_posix(), panels)
        for (path, texts) in images.text.detect(paths):
            text = ''.join(map(lambda x: x['description'], filter(lambda x: 'locale' in x,texts)))
            logger.info('-> {0}'.format(path))
            logger.info(text)
            db.metadata.update(path, auto_script=text)
        logger.info('Done')
    except Exception as e:
        logger.exception(e)

def start(panels):
    thread = threading.Thread(
            target=run,
            name=__name__,
            args=(panels, ))
    thread.start()
    return thread.ident
