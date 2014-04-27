SHELL := /bin/bash

SRC = ./src
BUILD = ./build

all: clean zip

zip:
	cd $(SRC); zip -r .$(BUILD)/pagebench.zip *; cd ..

clean:
	rm -f $(BUILD)/*
