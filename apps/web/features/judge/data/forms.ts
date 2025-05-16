import { JudgeFormMainSchema } from "../components/JudgeFormMain";
import { JudgeFormOtherSchema } from "../components/JudgeFormOther";

interface JudgeFormData {
  data: JudgeFormMainSchema | JudgeFormOtherSchema;
  photoId: string;
}
export const onJudgeFormMainSubmit = async ({
  data,
  photoId,
}: JudgeFormData) => {
  const formattedData = formatMainJudgeData(data);

  console.log({ ...formattedData, photoId });
};

export const onJudgeFormOtherSubmit = async ({
  data,
  photoId,
}: JudgeFormData) => {
  const formattedData = formatOtherJudgeData(data);

  console.log({ formattedData, photoId });
};

// --- Helpers ---
const formatMainJudgeData = (data: JudgeFormMainSchema) => {
  const formattedScores: Record<string, number> = {};
  Object.entries(data.score).forEach(([key, value]) => {
    formattedScores[key] = value[0] ?? 0;
  });
  return {
    scores: formattedScores,
    comment: data.comment === "" ? null : data.comment,
  };
};

const formatOtherJudgeData = (data: JudgeFormOtherSchema) => {
  return {
    comment: data.comment === "" ? null : data.comment,
  };
};
