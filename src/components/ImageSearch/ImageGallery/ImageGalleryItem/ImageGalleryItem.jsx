import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ showModal, webformatURL, tags }) => {
  const openModal = () => {
    showModal({ webformatURL, tags })
  } 
  
  return (
    <li
      onClick={openModal}
      className={styles.item}
    >
      <img src={webformatURL} alt={tags} className={styles.image} />
    </li>
  );
};

export default ImageGalleryItem;