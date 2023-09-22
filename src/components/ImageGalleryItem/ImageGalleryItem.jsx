import {
  ImageGalleryItemImg,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  const hendleImgClick = () => {
    onClick({ largeImageURL, tags });
  };
  return (
    <ImageGalleryItemStyled onClick={hendleImgClick}>
      <ImageGalleryItemImg src={webformatURL} alt={tags} />
    </ImageGalleryItemStyled>
  );
};

// export default class ImageGalleryItem extends Component {
//   state = {
//     largeImageURL: this.props.largeImageURL,
//     tags: this.props.tags,
//   };
//   hendleImgClick = () => {
//     this.props.onClick(this.state);
//   };
//   render() {
//     const { webformatURL, tags } = this.props;

// return (
//   <ImageGalleryItemStyled onClick={this.hendleImgClick}>
//     <ImageGalleryItemImg src={webformatURL} alt={tags} />
//   </ImageGalleryItemStyled>
// );
//   }
// }
