import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

const COUNT_ON_PAGE = 12;
const KEY = '20212958-6de35354194c73548614933a9';
const OPTIONS = `&image_type=photo&orientation=horizontal&per_page=${COUNT_ON_PAGE}`;

const extract = ({ data: { hits } }) => {
  return hits.map(
    ({ id, webformatURL: small, largeImageURL: large, tags: hint }) => {
      return { id, small, large, hint };
    },
  );
};

const getTotalPages = ({ data: { totalHits } }) =>
  Math.ceil(totalHits / COUNT_ON_PAGE);

// const isLastPage = ({ data: { hits, totalHits } }, page) => {
//   return !(hits.length && page * COUNT_ON_PAGE < totalHits);
// };

const fetchImagesDataPixabay = async (search, page) => {
  try {
    const url = `/?q=${search}&page=${page}&key=${KEY}${OPTIONS}`;
    const data = await axios.get(url);
    return {
      data: extract(data),
      totalPages: getTotalPages(data),
    };
  } catch (error) {
    throw error;
  }
};

export default fetchImagesDataPixabay;
