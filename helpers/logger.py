import logging

logging.basicConfig(format='%(asctime)s %(levelname)s %(name)s: %(message)s')

def create_logger(logger_name):
    logger = logging.getLogger(logger_name)
    return logger
