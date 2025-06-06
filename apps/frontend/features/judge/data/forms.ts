import { CategoryFormSchemaType } from "../components/CategoryForm";
import { JudgeFormMainSchema } from "../components/JudgeFormMain";
import { JudgeFormOthersSchema } from "../components/JudgeFormOther";
import { PhotoData } from "../types/main";

export interface JudgeFormMainData {
  data: JudgeFormMainSchema;
  photoId: string;
}

export interface JudgeFormOtherData {
  data: JudgeFormOthersSchema;
  photoId: string;
}

export const onJudgeFormMainSubmit = async ({
  data,
  photoId,
}: JudgeFormMainData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/main/${photoId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        scores: data.scores,
        comment: data.comment === "" ? null : data.comment,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to judge main photo: ${await res.text()}`);
  }
};

export const onJudgeFormOtherSubmit = async ({
  data,
  photoId,
}: JudgeFormOtherData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/other/${photoId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        comment: data.comment === "" ? null : data.comment,
        categoryId: data.categoryId,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to judge other photo: ${await res.text()}`);
  }
};

export const onAssignAwardSubmit = async ({
  awards,
}: {
  awards: { categoryId: string; photoId: string | undefined }[];
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/assign-award`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        awards,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to assign award: ${await res.text()}`);
  }
};

export const onCreateCategorySubmit = async (data: CategoryFormSchemaType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create category: ${await res.text()}`);
  }
};

export const onUpdateCategorySubmit = async (
  data: CategoryFormSchemaType,
  categoryId: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create category: ${await res.text()}`);
  }
};

export const onDeleteCategorySubmit = async (categoryId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to delete category: ${await res.text()}`);
  }
};
