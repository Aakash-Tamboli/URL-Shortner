import express from "express";
import urlModel from "../model/shortUrl";

// /src/controller/shortUrl.ts

export const createUrl = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    console.log("The full URL is: " + request.body.fullUrl);
    const { fullUrl } = request.body;

    const urlFound = await urlModel.find({ fullUrl });

    if (urlFound.length > 0) {
      response.status(409);
      response.send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      response.status(201).send(shortUrl);
    }
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
};

export const getAllUrl = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const shortUrls = await urlModel.find({});
    if (shortUrls.length < 0) {
      response.status(404).send({ message: "Short Urls not found" });
    } else {
      response.status(200).send(shortUrls);
    }
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
};

export const getUrl = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: request.params.id });
    if (!shortUrl) {
      response.status(404).send({ message: "Full Url not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      response.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
};

export const deleteUrl = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: request.params.id });
    if (shortUrl) {
      response.status(200).send({ message: "Requested URL sucessfully deleted" });
    }
  } catch (error) {
    response.status(500).send({ message: "Something went wrong" });
  }
};
