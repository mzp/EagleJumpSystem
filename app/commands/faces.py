import commands
import images.faces
import db.faces
import threading

def run(panels):
    logger = commands.get_logger(__name__, threading.get_ident())
    try:
        logger.info('Face detection')
        for panel in panels:
            path = panel['path'].as_posix()
            logger.info(path)

            crops = list(images.faces.detect(path))
            for crop in crops:
                logger.info(crop)
            db.faces.update(panel, crops)
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
