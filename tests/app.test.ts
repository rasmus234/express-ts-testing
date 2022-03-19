import {AccessToken} from "../2_sessions/AccessToken";
import {Role} from "../3_models/Role";
import {server} from "../launch";
import request from "supertest";


describe("tests token encryption and decryption", () => {
    it("should return the same token", () => {
        const token = AccessToken.generateToken(Role.admin);
        const decryptedToken = AccessToken.userRole(token);
        expect(decryptedToken).toBe(Role.admin);
    });
})

describe("tests the /products endpoint", () => {
    it("should return a product with no 78", async () => {
        const response = await request(server).get("/api/products/5")
        expect(response.status).toBe(200)
        expect(response.body.no).toBe(78)
    })
    it("should return a product with no 79", async () => {
        const response = await request(server).get("/api/products/6")
        expect(response.status).toBe(200)
        expect(response.body.no).toBe(79)
    })
    it("should return an empty json object with status 200", async () => {
        const response = await request(server).get("/api/products/7")
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({})
    })
    it("should return a collection of products", async () => {
        const response = await request(server).get("/api/products")
        expect(response.status).toBe(200)
        const data = response.body as any[]
        expect(data.find(product => product.no === 33)).toBeTruthy()
        expect(data.find(product => product.no === 45)).toBeTruthy()

    })
    it('should return status 201 and the same response body', async () => {
        const data = {test: "data"}
        const response = await request(server).post("/api/products").send(data)
        expect(response.status).toBe(201)
        expect(response.body).toStrictEqual(data)
    });
});

describe("tests the default wrong route", () => {
    it("should return 404", async () => {
        const response = await request(server).get("/invalid")
        expect(response.status).toBe(404)
    })
})

describe("Combinational testing of the role based security system", () => {

    describe("as role: admin", () => {

        const agent = request.agent(server)

        beforeAll(async () => {
            const response = await agent.post("/login").send({role: Role.admin})
        })

        it("should return 200", async () => {
            const response = await agent.get("/admin")
            expect(response.status).toBe(200)
        })
        it("should return 200", async () => {
            const response = await agent.get("/regular")
            expect(response.status).toBe(200)
        })
        it("should return 200", async () => {
            const response = await agent.get("/anonymous")
            expect(response.status).toBe(200)
        })
    })
    describe("as role: regular", () => {

        const agent = request.agent(server)

        beforeAll(async () => {
            const response = await agent.post("/login").send({role: Role.regular})
        })

        it("should return 403", async () => {
            const response = await agent.get("/admin")
            expect(response.status).toBe(403)
        })
        it("should return 200", async () => {
            const response = await agent.get("/regular")
            expect(response.status).toBe(200)
        })
        it("should return 200", async () => {
            const response = await agent.get("/anonymous")
            expect(response.status).toBe(200)
        })
    })
    describe("as role: anonymous", () => {

        const agent = request.agent(server)

        beforeAll(async () => {
            const response = await agent.post("/login").send({role: Role.anonymous})
        })

        it("should return 403", async () => {
            const response = await agent.get("/admin")
            expect(response.status).toBe(403)
        })
        it("should return 403", async () => {
            const response = await agent.get("/regular")
            expect(response.status).toBe(403)
        })
        it("should return 200", async () => {
            const response = await agent.get("/anonymous")
            expect(response.status).toBe(200)
        })
    })

})

afterAll(async () => {
    await server.close()
})
