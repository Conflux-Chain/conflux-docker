#!/bin/bash
for i in {1..10}
do
    echo "gen account " $i
    conflux account new    # 需要输入密码，在docker构建时可以work，但确定使用的密码是多少
done