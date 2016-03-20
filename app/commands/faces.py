import commands
import db.metadata
import images.text
import threading

def run(panels):
    logger = commands.get_logger(__name__, threading.get_ident())
    try:
        logger.info('Face detection')
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
