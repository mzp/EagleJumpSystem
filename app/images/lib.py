# -*- coding: utf-8 -*-
# fork from https://github.com/non117/zoi
import cv2
import numpy as np
import pylab as plt

def show(im):
    # matplotlibで画像を表示する
    b, g, r = cv2.split(im)
    im = cv2.merge([r,g,b])
    plt.imshow(im)
    plt.show()

def diff(seq):
    # 微分
    prev = seq[0]
    new_seq = []
    for x in seq:
        new_seq.append(prev - x)
        prev = x
    return new_seq

def rotate(im, angle):
    # 大回転
    h, w = im.shape[0], im.shape[1]
    mat = cv2.getRotationMatrix2D((h/2, w/2), angle, 1)
    return cv2.warpAffine(im, mat, (w, h))

def hough(im_gray, threshold=300):
    # ノイズ除去
    im_gray = cv2.medianBlur(im_gray, 5)
    # グレースケール画像を2値化
    im_th = cv2.adaptiveThreshold(im_gray,50,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)
    # 2値化画像からエッジを検出
    im_edge = cv2.Canny(im_th,50,150,apertureSize = 3)
    # エッジ画像から直線の検出
    lines = cv2.HoughLines(im_edge,1,np.pi/180,threshold)
    return lines

def noisereduction(im):
    # ノイズを減らすかも
    return cv2.bilateralFilter(im, 0, 32, 2)

def LUT(gam):
    # ガンマ値を指定するLookUpTableをつくる
    table = np.zeros((1,256,3),np.uint8)
    for j in range(256):
        x = int( 255.*( j / 255. )**( 1./gam ) )
        table[0,j] = tuple([x, x, x])
    return table



