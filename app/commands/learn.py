import commands
import images.learn
import db.models
import threading

def run(id, panels, tags):
    logger = commands.get_logger(__name__, threading.get_ident())
    try:
        logger.info('Learn characters')

        data = []
        for panel in panels:
            for (face, character) in zip(panel['faces'], panel['metadata']['characters']):
                logger.info('%s %s' % (face, character))

                if character in tags:
                    data.append((face.as_posix(), tags.index(character)))

        images.learn.train(logger, db.models.path_for(id).as_posix(), len(tags), data)
        db.models.update(id, tags)
        logger.info('Done')

    except Exception as e:
        logger.exception(e)

def start(id, panels, tags):
    thread = threading.Thread(
            target=run,
            name=__name__,
            args=(id, panels, tags))
    thread.start()
    return thread.ident
