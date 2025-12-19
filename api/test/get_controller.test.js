import supertest from "supertest";
import app from "../app/app.js";

describe("GET /api/forms/get-schema", () => {
  it("should return 200 and the form schema", async () => {
    const uploadRes = await supertest(app)
      .post("/api/forms/submit-schema")
      .send([
        {
          id: Date.now(),
          label: "Full Name",
          placeholder: "Full name",
          required: true,
          type: "text",
        },
      ]);

    expect(uploadRes.statusCode).toEqual(201);
    expect(uploadRes.body).toHaveProperty("schemaId");

    const res = await supertest(app).get("/api/forms/get-schema");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("fields");

    const deleteRes = await supertest(app).delete(
      `/api/forms/delete-schema/${uploadRes.body.schemaId}`
    );

    expect(deleteRes.statusCode).toEqual(200);
  });
});
