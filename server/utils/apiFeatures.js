class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // searching
  search() {
    const keyword = this.queryString.keyword
      ? {
          model: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });

    return this;
  }

  // filtering
  filter() {
    const queryCopy = { ...this.queryString };

    const removeFields = ["keyword", "limit", "page"];

    removeFields.forEach((field) => delete queryCopy[field]);

    let queryString = JSON.stringify(queryCopy);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  // pagination
  pagination(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default APIFeatures;
