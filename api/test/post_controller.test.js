import supertest from "supertest";
import app from "../app/app.js";

let schemasToDelete = [];

describe("POST /api/forms/submit-schema", () => {
  it("should return 201 and return an id", async () => {
    const formSchema = [
      {
        id: Date.now(),
        label: "Full Name",
        placeholder: "Full name",
        required: true,
        type: "text",
      },
    ];

    const res = await supertest(app)
      .post("/api/forms/submit-schema")
      .send(formSchema);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("schemaId");

    schemasToDelete.push(res.body.schemaId);
  });
});

afterAll(async () => {
  if (schemasToDelete.length > 0) {
    for (const id of schemasToDelete) {
      try {
        await supertest(app).delete(`/api/forms/delete-schema/${id}`);
      } catch (error) {
        console.error("Failed to delete schema:", error);
      }
    }
  }
});
