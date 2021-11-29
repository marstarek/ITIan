import "./news.css";
import ShowMoreText from "react-show-more-text";

export const News = ({ news }) => {
  return (
    <>
      <div className="rightbarNewsItem  ">
        {news.media && <img src={news.media} className="rightbarImg" alt="" />}
        <div>
          <bdi className="postText ">
            <ShowMoreText
              lines={3}
              more="Show more"
              less="...Show less"
              anchor
              className="oooeeer"
              expanded={false}
              width={0}
            >
              {news.newsText}
            </ShowMoreText>
          </bdi>

          {/* <p className="NewsName text-dark ">{news.newsText}</p> */}
          <p className=" event__date  text-dark m-0">{news.eventDate}</p>
        </div>
      </div>
      {/* <p>{news.createdAt}</p> */}
    </>
  );
};
export default News;
