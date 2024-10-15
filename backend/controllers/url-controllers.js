const URL = require("../models/url");
const uuid = require("uuid");

async function generateURL(req, res) {
  try {
    const { originalURL } = req.body;

    if (!originalURL) {
      return res.json({
        success: false,
        message: "Something went wrong while generating the URL",
        data: {},
        error: {},
      });
    }

    const id = uuid.v4().substring(0, 8);

    const createdURL = await URL.create({
      originalURL: originalURL,
      shortID: id,
      generatedURL: "http://localhost:8000/" + id,
    });

    return res.status(200).json({
      success: true,
      message: "Short URL generated successfully",
      data: {
        createdURL,
      },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while creating shortURL",
      data: {},
      error: { error },
    });
  }
}

async function getAllURL(req, res) {
  try {
    const allURL = await URL.find({});
    return res.status(200).json({
      success: true,
      message: "Successfully got all the urls",
      data: {
        allURL,
      },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while creating shortURL",
      data: {},
      error: { error },
    });
  }
}

async function destroyURL(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({
        success: false,
        message: "Something went wrong while deleting the short url",
        data: {},
        error: {},
      });
    }
    const deletedURL = await URL.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the url",
      data: {
        deletedURL,
      },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while deleting the short url",
      data: {},
      error: { error },
    });
  }
}

async function redirectUser(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({
        success: false,
        message: "Something went wrong while redirecting the user",
        data: {},
        error: {},
      });
    }

    const url = await URL.findOneAndUpdate(
      { shortID: id },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    return res
      .status(200)
      .redirect(
        url.originalURL.startsWith("http")
          ? url.originalURL
          : `http://${url.originalURL}`
      );
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong while redirecting the user",
      data: {},
      error: { error },
    });
  }
}

module.exports = {
  generateURL,
  getAllURL,
  destroyURL,
  redirectUser,
};
