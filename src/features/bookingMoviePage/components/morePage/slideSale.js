import React from 'react';
import ReactDOM from 'react-dom';
import './slideSale.css';

export default class SlideSale extends React.Component {
  constructor(props) {
    super(props);

    /*
    * State slideIndex dùng để xác định xem slide nào đang được active.
    * Các ảnh sẽ được xếp chồng lên nhau, cái nào active thì hiển thị,
    * Cái nào không active thì ẩn đi.
    */
    this.state = {
      slideIndex: 0
    };

    /*
    * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
    * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
    * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước.
    */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.setSlideIndex = this.setSlideIndex.bind(this);
    this.getNewSlideIndex = this.getNewSlideIndex.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.runAutomatic = this.runAutomatic.bind(this);
  }

  /*
  * Tính chỉ số SlideIndex mới, với step là bước nhảy: +1 hoặc -1
  * Giả sử, mình có 6 ảnh => các chỉ số lần lượt là: 0, 1, 2,...5
  * Chú ý:
  * Nếu đang ở chỉ số 5 mà đi về phía trước thì slideIndex = 0
  * Nếu đang ở chỉ số 0 mà về sau thì slideIndex = 5
  */
  getNewSlideIndex(step) {
    const slideIndex = this.state.slideIndex;
    const numberSlide = this.props.input.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  }

  // Quay về ảnh phía trước, tức index giảm 1 => step = -1
  backward() {
    this.setState({
      slideIndex: this.getNewSlideIndex(-1)
    });
  }

  // Tiến tới ảnh phía sau, tức index tăng 1 => step = 1
  forward() {
    this.setState({
      slideIndex: this.getNewSlideIndex(1)
    });
  }

  // Xác định slideIndex nào sẽ được active
  setSlideIndex(index) {
    this.setState({
      slideIndex: index
    })
  }

  /*
  * Cập nhật chiều cao cho container khi thay đổi kích thước màn hình
  * Trong phần CSS, mình để container có width = 100%,
  * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100%
  * Nhưng chiều cao phải tính lại dựa vào width và tỉ lệ this.ratioWH
  */
  updateDimensions() {
    this.containerElm.style.height 
      = `${this.containerElm.offsetWidth / this.ratioWH}px`;
  }

  /*
  * Nếu người dùng truyền vào thuộc tính mode = automatic
  * tSale sẽ chạy tự động dựa vào interval.
  * Hàm này sẽ được gọi trong mỗi lượt lặp lại
  * để cập nhật slideIndex mới cSale
  */
  runAutomatic() {
    this.setState({
      slideIndex: this.getNewSlideIndex(1)
    });
  }

  /*
  * Hàm này thuộc về React Component Lifecycle
  * được gọi sau khi component này được render xong
  * Trong đây, sẽ lưu lại reference cho container - this.containerElm
  * Cập nhật lại chiều cao cho container - this.updateDimensions();
  * Đăng ký sự kiện thay đổi kích thước - resize
  * Kiểm tra nếu mode === "automatic" thì sẽ tạo mới một interval
  * để thay đổi hình ảnh - this.runAutomatic()
  * với giá trị timeout được truyền từ props hoặc mặc định là 5000 ms
  */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    if (this.props.mode === "automatic") {
      const timeout = this.props.timeout || 5000;

      this.automaticInterval = setInterval(
        () => this.runAutomatic(),
        Number.parseInt(timeout)
      );
    }
  }

  /*
  * Hàm này cũng thuộc về React Component Lifecycle -
  * được gọi khi component này bị xóa khỏi màn hình
  * Lúc này, mình phải hủy bỏ sự kiện khi resize
  * và xóa bỏ interval đã khai bảo bên trên để tránh leak memory.
  */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.automaticInterval) clearInterval(this.automaticInterval);
  }

  /*
  * Giao diện của component
  * với phần tử ngoài cùng mình để className="Sale"
  * để tránh xung đột về tên với các component khác
  */
  render() {
    return (
      <div className="lp-slideshow">
        <div className="container">
          {
            this.props.input.map((image, index) => {
              return (
                <div
                  key={index}
                  className={
                    `slide ${this.state.slideIndex === index ? "active" : ""}`
                  }
                >
                  <div className="number-text">
                    {`${index + 1} / ${this.props.input.length}`}
                  </div>
                  <img className="image" src={image.src} alt={image.caption} />
                  <div className="caption-text">{image.caption}</div>
                </div>
              )
            })
          }

          <span className="prev" onClick={this.backward}>❮</span>
          <span className="next" onClick={this.forward}>❯</span>
        </div>

        <div className="dot-container">
          {
            this.props.input.map((_, index) => {
              return (
                <span
                  key={index}
                  className={
                    `dot ${this.state.slideIndex === index ? "active" : ""}`
                  }
                  onClick={() => this.setSlideIndex(index)}
                >
                </span>
              )
            })
          }
        </div>
      </div>
    );
  }
}