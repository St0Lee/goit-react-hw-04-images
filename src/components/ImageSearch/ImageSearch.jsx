import { useState, useEffect, useCallback } from "react";

import Button from "components/Button/Button";
import Modal from "components/Modal/Modal"
import Loader from "components/Loader/Loader"

import {searchImages} from "../../api/images"
import Searchbar from "./Searchbar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery";

import styles from "./image-search.module.css"

const ImageSearch = () => {
  const [search, setSearch] = useState(""); 
  const [totalHits, setTotalHits] = useState(0);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageDetails, setImageDetails] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data } = await searchImages(search, page);
        setHits(prevHits => data.hits?.length ? [...hits, ...data.hits] : prevHits)
        setTotalHits(prevTotalHits => data.totalHits ? data.totalHits : prevTotalHits)
      
      } 
      catch (error) {
        setError(error.message);
      } 
      finally {
        setLoading(false);
      }
    }
    if(search) {
      fetchImages()
    }
   
  }, [search, page])

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setTotalHits(0);
    setHits([]);
    setPage(1); 
  }, []);

  const loadMore = useCallback(() => setPage(prevPage => prevPage + 1),[]);


  const showModal = useCallback(({ webformatURL, tags }) => {
    setModalOpen(true);
    setImageDetails({
      webformatURL,
      tags,
    })
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setImageDetails({})
  }, []);

  const isImages = Boolean(hits.length);
  const isTotal = Boolean(totalHits > hits.length);

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {error && <p className={styles.error}> {error}</p>}
      {loading && <Loader />}
      {isImages && <ImageGallery showModal={showModal} items={hits} />}
      {isTotal && (
        <div className={styles.loadMoreWrapper}>
          <Button type="button" onClick={loadMore}>
            {loading ? <Loader /> : 'Load more'}
          </Button>
        </div>
      )}

      {modalOpen && (
        <Modal close={closeModal}>
          <img src={imageDetails.webformatURL} alt={imageDetails.tags} />
        </Modal>
      )}
    </>
  );
}
  
  export default ImageSearch;