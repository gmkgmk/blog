From centos

LABEL name="guomk" \
  email="www.github.com/gmkgmk"

ADD ./node-v10.16.0-linux-x64.tar.xz /home
COPY ./readme.md /home
COPY ./index.js /home


ENV NODE_HOME=/home/node-v10.16.0-linux-x64
ENV PATH=$PATH:$NODE_HOME/bin

# RUN node /home/index.js

ENV path = /home
WORKDIR ${path}
EXPOSE 8888


CMD ["node","/home/index.js"]

