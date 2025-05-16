import { JudgeFormMainSchema } from "../components/JudgeFormMain";
import { JudgeFormOtherSchema } from "../components/JudgeFormOther";

export interface JudgeFormData {
  data: JudgeFormMainSchema | JudgeFormOtherSchema;
  photoId: string;
}
export const onJudgeFormMainSubmit = async ({
  data,
  photoId,
}: JudgeFormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/main/${photoId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        scores: data.score,
        comment: data.comment === "" ? null : data.comment,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update photo");
  }
};

export const onJudgeFormOtherSubmit = async ({
  data,
  photoId,
}: JudgeFormData) => {
  const formattedData = formatOtherJudgeData(data);

  console.log({ formattedData, photoId });
};

const formatOtherJudgeData = (data: JudgeFormOtherSchema) => {
  return {
    comment: data.comment === "" ? null : data.comment,
  };
};
