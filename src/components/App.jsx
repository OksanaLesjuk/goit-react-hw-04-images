import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPhotosService } from 'api/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import StyledApp from 'App.styled';
import Button from './Button/Button';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  // componentDidUpdate(_, prevState) {
  //   if (
  //     this.state.currentPage !== prevState.currentPage ||
  //     this.state.searchQuery !== prevState.searchQuery
  //   ) {
  //     this.fetchGallery();
  //   }
  // }

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchGallery();
    console.log('currentPage :>> ', currentPage);
  }, [currentPage, searchQuery]);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await getPhotosService(
        searchQuery,
        currentPage
      );

      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (hits.length > 0) {
        setGallery(prev => [...prev, ...hits]);
        setQuantityPage(Math.ceil(totalHits / 12));
        // this.setState(prev => ({
        //   gallery: [...prev.gallery, ...hits],
        //   quantityPage: Math.ceil(totalHits / 12),
        // }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = searchQuery => {
    setCurrentPage(1);
    setQuantityPage(null);
    setGallery([]);
    setQuantityPage(null);
    setSearchQuery(searchQuery);
  };

  const handleModal = obj => {
    // this.setState({ isLoading: true, showModal: true, ...obj });
    setIsLoading(false);
    setShowModal(true);
    setLargeImageURL(obj.largeImageURL);
    setTags(obj.tags);
  };

  const handleCloseModal = () => {
    // this.setState({ isLoading: false, showModal: false });
    setIsLoading(false);
    setShowModal(false);
  };

  const handleBtnLoad = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {error && Notify.failure(error)}
      {gallery && gallery.length > 0 && (
        <ImageGallery hits={gallery} onClick={handleModal} />
      )}
      {currentPage < quantityPage && <Button handleBtnLoad={handleBtnLoad} />}

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </StyledApp>
  );
}
