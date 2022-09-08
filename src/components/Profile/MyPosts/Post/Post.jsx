import s from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={s.item}>
            <div>
                <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt=""/>
            </div>
            <div className={s.message}>
                {props.message}
            </div>
            <div>
                <div>
                    {props.likesCount} 💙
                </div>
                <button className={s.buttonLike}>Like</button>
            </div>
        </div>
    );
};

export default Post;
