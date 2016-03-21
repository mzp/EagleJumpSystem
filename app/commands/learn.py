import commands
import images.faces
import db.faces
import threading

def run(panels, tags):
    logger = commands.get_logger(__name__, threading.get_ident())
    try:
        logger.info('Learn characters')
        logger.info('Done')
    except Exception as e:
        logger.exception(e)

def start(panels, tags):
    thread = threading.Thread(
            target=run,
            name=__name__,
            args=(panels, tags))
    thread.start()
    return thread.ident
