import supertest from "supertest";
import app from "../app/app.js";

describe("DELETE /api/forms/delete-schema", () => {
  it("should return 200 when deleting an existing schema", async () => {
    const formSchema = [
      {
        id: 123,
        label: "Full Name",
        placeholder: "Full name",
        required: true,
        type: "text",
      },
      {
        id: 124,
        label: "Age",
        placeholder: "Age",
        required: true,
        type: "number",
      },
      {
        id: 125,
        label: "Sex",
        options: ["Male", "Female"],
        required: true,
        type: "radio",
      },
    ];

    const uploadRes = await supertest(app)
      .post("/api/forms/submit-schema")
      .send(formSchema);

    expect(uploadRes.statusCode).toEqual(201);
    expect(uploadRes.body).toHaveProperty("schemaId");

    const deleteRes = await supertest(app).delete(
      `/api/forms/delete-schema/${uploadRes.body.schemaId}`
    );

    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body).toHaveProperty(
      "message",
      `Form schema with id ${uploadRes.body.schemaId} deleted successfully`
    );
  });
});
