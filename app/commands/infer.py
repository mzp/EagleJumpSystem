import commands
import images.learn
import db.models
import db.metadata
import threading

def run(id, panels):
    logger = commands.get_logger(__name__, threading.get_ident())
    try:
        logger.info('Character infer detection')

        tags = db.models.tags(id)
        reuse = False
        for panel in panels:
            logger.info(panel['path'])
            auto_characters = []
            for face in panel['faces']:
                logger.info(face)
                prediction = images.learn.infer(db.models.path_for(id).as_posix(), len(tags), face.as_posix(), reuse=reuse)
                reuse = True
                tag = tags[prediction]
                logger.info('{0} => {1}'.format(prediction, tag))
                auto_characters.append(tag)
            db.metadata.update(panel['path'].as_posix(), auto_characters=auto_characters)
        logger.info('Done')
    except Exception as e:
        logger.exception(e)

def start(id, panels):
    thread = threading.Thread(
            target=run,
            name=__name__,
            args=(id, panels))
    thread.start()
    return thread.ident
