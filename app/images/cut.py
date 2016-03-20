# fork from https://github.com/non117/zoi
import sys

import cv2
import numpy as np
import pylab as plt

from pathlib import Path

from images.lib import show, diff, rotate, hough

class Cut:
    def __init__(self):
        self.nxs = [0,0,0,0]
        self.nys = [0,0,0,0,0,0,0,0]
        self.n = 0
        self.x1 = []
        self.x2 = []
        self.y1 = []


    def clean(self, seq):
        # 連続した値から代表値を抽出する
        xs = []
        temp = []
        prev = seq[0]
        for x in seq:
            if x - prev < 20:
                temp.append(x)
            else:
                if temp:
                    xs.append(int(np.average(temp)))
                    temp = [x]
                else:
                    xs.append(x)
            prev = x
        if temp:
            xs.append(int(np.average(temp)))
        return xs

    def determine(self, seq):
        # ヒストグラムの微分値から濃淡変化の大きい行, 列を探す
        xs = []
        th = max(seq) / 2
        for i, x in enumerate(seq):
            if np.abs(x) > th:
                xs.append(i)
        return self.clean(xs)

    def normalize(self, seq):
        # 紙面座標系からコマの座標系に正規化
        offset = seq[0]
        return [x - offset for x in seq]

    def store(self, xs, ys):
        self.y1.append(ys[-1])
        if self.n == 0:
            self.x1.append(xs[0])
        elif np.abs(np.average(self.x1) - xs[0]) < 20:
            self.x1.append(xs[0])
        else:
            self.x2.append(xs[0])
        self.xs = self.normalize(xs)
        self.ys = self.normalize(ys)
        self.nxs = map(sum, zip(xs, self.nxs))
        self.nys = map(sum, zip(ys, self.nys))
        self.n += 1

    def nearest(self, xs, ys):
        # x, yに最も近いxs, ys内の座標を探す
        near = 5000
        nx, ny = 0, 0
        for x_ in self.x1 + self.x2:
            for x in xs:
                diff = np.abs(x - x_)
                if diff < near:
                    near = diff
                    nx = x
        near = 5000
        for y_ in self.y1:
            for y in ys:
                diff = np.abs(y - y_)
                if diff < near:
                    near = diff
                    ny = y
        return nx, ny

    def estimate(self, xs, ys, h):
        # コマ座標が抽出できていればそのまま、なければ推定する
        if len(ys) == 8 and len(xs) == 4:
            return xs, ys
        elif self.n != 0:
            #print('estimated.')
            xs_ = list(map(lambda x:x/self.n, self.nxs))
            ys_ = list(map(lambda y:y/self.n, self.nys))
            yoffset = ys_[7] - ys_[0]
            x0, y_ = self.nearest(xs, ys)
            y0 = y_ - yoffset
            est_xs = [int(x0 + x) for x in xs_]
            est_ys = [int(y0 + y) for y in ys_]
            return est_xs, est_ys
        else:
            return xs, ys

    def statistics(self, path, exception=False):
        im_in = cv2.imread(path)
        h, w, _ = im_in.shape
        im_gray = cv2.cvtColor(im_in, cv2.COLOR_BGR2GRAY)
        im = cv2.GaussianBlur(im_gray, (5,5), 0)

        yoko = (im.sum(0)/w).tolist()
        tate = (im.sum(1)/h).tolist()
        xs = self.determine(diff(yoko))
        ys = self.determine(diff(tate))

        if not exception and len(ys) == 8 and len(xs) == 4:
            self.store(xs, ys)

    def crop(self, path, exception=False):
        im_in = cv2.imread(path)
        h, w, _ = im_in.shape
        im_gray = cv2.cvtColor(im_in, cv2.COLOR_BGR2GRAY)
        im_out = cv2.imread(path)
        im = cv2.GaussianBlur(im_gray, (5,5), 0)

        yoko = (im.sum(0)/w).tolist()
        tate = (im.sum(1)/h).tolist()
        xs = self.determine(diff(yoko))
        ys = self.determine(diff(tate))

        if not exception:
            xs, ys = self.estimate(xs, ys, h)

        for i in reversed(range(len(xs) - 1)):
            for j in range(len(ys) -1):
                x1, x2 = xs[i], xs[i+1]
                y1, y2 = ys[j], ys[j+1]
                if 50000 < (x2 - x1) * (y2 - y1) and x2 < w and y2 < h:
                    im_trim = im_out[y1:y2, x1:x2]
                    yield im_trim
