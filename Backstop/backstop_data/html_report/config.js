report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_Accent-color-input-10png_0_document_0_default.png",
        "test": "..\\bitmaps_test\\20240512-221826\\backstop_default_Accent-color-input-10png_0_document_0_default.png",
        "selector": "document",
        "fileName": "backstop_default_Accent-color-input-10png_0_document_0_default.png",
        "label": "Accent-color-input-10.png",
        "requireSameDimensions": 0.1,
        "misMatchThreshold": 0.1,
        "url": "./../screenshots/@ES01-v5.80.0/After-7.png",
        "referenceUrl": "./backstop_data/bitmaps_reference/Before-1.png",
        "expect": 0,
        "viewportLabel": "default",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 6.676875,
          "misMatchPercentage": "6.68",
          "analysisTime": 35
        },
        "diffImage": "..\\bitmaps_test\\20240512-221826\\failed_diff_backstop_default_Accent-color-input-10png_0_document_0_default.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});