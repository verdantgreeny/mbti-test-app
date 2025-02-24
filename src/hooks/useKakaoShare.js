import { useEffect } from "react";
import { toast } from "react-toastify";

const useKakaoShare = (user) => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("1031360ce41e4d35acea6fe1571b7314");
    }
  }, []);

  const handleShareResult = (result) => {
    if (!result) {
      toast.error("공유할 결과가 없습니다.");
      return;
    }

    if (!window.Kakao) {
      toast.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${user.nickname}님의 MBTI 결과는 ${result}`,
        description: "MBTI 테스트 결과",
        imageUrl:
          "https://velog.velcdn.com/images/verdantgreeny/post/0b11a19a-d266-441c-a32a-6dec8231d04f/image.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "결과 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
      success: () => {
        toast.success("카카오톡으로 공유되었습니다.");
      },
      fail: () => {
        toast.error("카카오톡 공유에 실패했습니다.");
      },
    });
  };

  return { handleShareResult };
};

export default useKakaoShare;
