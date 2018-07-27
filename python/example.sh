#!/bin/bash

echo -n "New OnePiece: "
./check.py \
    -u "https://mangaclub.ru/manga/view/156-one-piece/v91-c912.html#01" \
    -s ".manga-thumbs-chapters > a" \
    -a "href"

echo -n "New Tower of God: "
./check.py \
    -u "https://read.yagami.me/read/tower_of_god/2/310/" \
    -s ".dropdown_chapter > li > a" \
    -a "href" \
    -i "0"

echo -n "New 100 Bullets: "
./check.py \
    -u "http://unicomics.ru/comics/online/100-bullets-002/" \
    -s "#modal a"\
    -a "href" \
    -i "-2" \
    -f "{url}[10:]"

echo -n "New Preacher: "
./check.py \
    -u "https://www.lostfilm.tv/series/Preacher/seasons/" \
    -s ".beta"\
    -a "text" \
    -i "1" \
    -f "3 сезон 4 серия"
