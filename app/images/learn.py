import sys
import cv2
import numpy as np
import math
import tensorflow as tf
from images.classify import *

TRAIN_DIR = '/tmp/data'
LEARNING_RATE = 1e-4

def __read(path):
    # normalize image data
    image = cv2.imread(path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image = cv2.resize(image, (IMAGE_SIZE, IMAGE_SIZE))
    return image.flatten().astype(np.float32)/255.0

def __label(num_classes, k):
    # prepare for 1-of-k
    tmp = np.zeros(num_classes)
    tmp[k] = 1
    return tmp

def __logits(num_classes):
    images_placeholder = tf.placeholder("float", shape=(None, IMAGE_PIXELS))
    keep_prob = tf.placeholder("float")
    logits = inference(num_classes, images_placeholder, keep_prob)
    return (images_placeholder, keep_prob, logits)

def __accuracy(num_classes):
    labels_placeholder = tf.placeholder("float", shape=(None, num_classes))

    (images_placeholder, keep_prob, logits) = __logits(num_classes)

    loss_value = loss(logits, labels_placeholder)
    train_op = training(loss_value, LEARNING_RATE)
    acc = accuracy(logits, labels_placeholder)
    return (images_placeholder, labels_placeholder, keep_prob, train_op, acc)

def __train(logger, train_image, train_label, model, batch_size=10, max_steps=200):
    (images_placeholder, labels_placeholder, keep_prob, train_op, acc) = model
    sess = tf.Session()
    sess.run(tf.initialize_all_variables())
    summary_op = tf.merge_all_summaries()
    summary_writer = tf.train.SummaryWriter(TRAIN_DIR, sess.graph_def)

    for step in range(max_steps):
        for i in range(math.ceil(len(train_image)/batch_size)):
            batch = batch_size*i
            sess.run(train_op, feed_dict={
              images_placeholder: train_image[batch:batch+batch_size],
              labels_placeholder: train_label[batch:batch+batch_size],
              keep_prob: 0.5})

        train_accuracy = sess.run(acc, feed_dict={
            images_placeholder: train_image,
            labels_placeholder: train_label,
            keep_prob: 1.0})
        logger.info("step %d, training accuracy %g" % (step, train_accuracy))

        summary_str = sess.run(summary_op, feed_dict={
            images_placeholder: train_image,
            labels_placeholder: train_label,
            keep_prob: 1.0})
        summary_writer.add_summary(summary_str, step)

    return sess

def train(logger, model_path, num_classes, data):
    # setup training label
    train_image = []
    train_label = []

    for (path, k) in data:
        train_image.append(__read(path))
        train_label.append(__label(num_classes, k))

    # convert to numpy
    train_image = np.asarray(train_image)
    train_label = np.asarray(train_label)

    with tf.Graph().as_default():
        with tf.variable_scope('ejs') as scope:
            reuse = True
            # create expression
            acc = __accuracy(num_classes)

        saver = tf.train.Saver()

        # run training batch
        sess = __train(logger, train_image, train_label, acc)

    # save trained model
    saver.save(sess, model_path)
    tf.reset_default_graph()
    sess.close()


def infer(model_path, num_classes, path):
    with tf.variable_scope('ejs') as scope:
        reuse = True
        (images_placeholder, keep_prob, logits) = __logits(num_classes)

    sess = tf.InteractiveSession()
    saver = tf.train.Saver()
    sess.run(tf.initialize_all_variables())
    saver.restore(sess, model_path)
    saver.restore(sess, model_path)

    image = __read(path)
    prediction = np.argmax(logits.eval(feed_dict={
          images_placeholder: [image],
          keep_prob: 1.0 })[0])
    tf.reset_default_graph()
    sess.close()
    return prediction
