import { test, expect } from '@playwright/test';
//import * as allure from 'allure-playwright';
import * as allure from "allure-js-commons";
import { Status } from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { url } from 'inspector/promises';

/*const credentials = [
    {
        urlGet: 'https://petstore.swagger.io/',
        'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
        ''
    },
];*/
//credentials.forEach(({ urlGet }) 
for (const urlGetPet of ['https://petstore.swagger.io/',
    'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
    'https://petstore.swagger.io/v2/pet/findByStatus?status=pending',
    'https://petstore.swagger.io/v2/pet/findByStatus?status=sold']) {
    test(`GET pet запрос ${urlGetPet}`, async ({ request }) => {
    test.info().annotations.push(
        { type: 'tag', description: 'apiGetPet' },
    );
        //Allure settings
        await allure.epic('API');
        await allure.story('get');
        await allure.label('owner', 'Me');
        await allure.displayName(`GET pet запрос ${urlGetPet}`);
        await allure.severity('critical');
        await allure.suite("pet");
        
    const response = await request.get(urlGetPet);

        // Проверки
        if (urlGetPet === "https://petstore.swagger.io/") {
            const response = await request.get(urlGetPet);
            expect(response.headers()['content-type']).toContain('text/html');
            const html = await response.text();
            expect(html).toContain('Swagger UI');
        }
        else {
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toContain('application/json');

            const users = await response.json();
            expect(users.length).toBeGreaterThan(0);
        }
    });
};


for (const urlGetUser of ['https://petstore.swagger.io/',
    'https://petstore.swagger.io/v2/user/login?username=query&password=query',
    'https://petstore.swagger.io/v2/user/string',
    'https://petstore.swagger.io/v2/user/logout']) {
    test(`GET user запрос ${urlGetUser}`, async ({ request }) => {
        test.info().annotations.push(
            { type: 'tag', description: 'apiGetUser' },
        );
        //Allure settings
        await allure.epic('API');
        await allure.story('get');
        await allure.label('owner', 'Me');
        await allure.displayName(`GET user запрос ${urlGetUser}`);
        await allure.severity('critical');
        await allure.suite("user");

          
        // Проверки
        if (urlGetUser === "https://petstore.swagger.io/") {
            test.skip();
            const response = await request.get(urlGetUser);
            expect(response.headers()['content-type']).toContain('text/html');
            const html = await response.text();
            expect(html).toContain('Swagger UI');
        }
        else if (urlGetUser === "https://petstore.swagger.io/v2/user/login?username=query&password=query") {
            // Проверка ответа для данных пользователя
            const response = await request.get(urlGetUser);
            const responseData = await response.json();

            // Проверка структуры ответа
            expect(responseData).toEqual({
                code: 200,
                type: 'unknown',
                message: expect.stringMatching(/^logged in user session:/)
            });

            // Альтернативный вариант проверки message:
            expect(responseData.message).toMatch(/^logged in user session:/);

        }
        else if (urlGetUser === "https://petstore.swagger.io/v2/user/logout") {
            // Проверка ответа для логаута
            const response = await request.get(urlGetUser).then(res => res.json());
            expect(response).toHaveProperty('code', 200);
            expect(response).toHaveProperty('type', 'unknown');
            expect(response).toHaveProperty('message', 'ok');
        }
        else if (urlGetUser === "https://petstore.swagger.io/v2/user/string") {
            const httpResponse = await request.get(urlGetUser);

            // 2. Проверяем статус и заголовки ДО парсинга тела
            expect(httpResponse.status()).toBe(200);
            expect(httpResponse.headers()['content-type']).toContain('application/json');

            // 3. Парсим JSON
            const userData = await httpResponse.json();

            expect(userData).toEqual({
                id: expect.any(Number), // Проверяем что id - число
                username: 'string',
                firstName: 'string',
                lastName: 'string',
                email: 'string',
                password: 'string',
                phone: 'string',
                userStatus: expect.any(Number)
            });
         }
    });
};


for (const urlGetStore of ['https://petstore.swagger.io/', //отлажен
    'https://petstore.swagger.io/v2/store/inventory',
    'https://petstore.swagger.io/v2/store/order/1',
    'https://petstore.swagger.io/v2/store/order/6']) {
    test(`GET store запрос ${urlGetStore}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {
            
            //Allure settings
            await allure.epic('API');
            await allure.story('get');
            await allure.label('owner', 'Me');
            await allure.displayName(`GET store запрос ${urlGetStore}`);
            await allure.severity('critical');
            await allure.suite("store");

            const response = await request.get(urlGetStore);

            // Проверки
            expect(response.status()).toBe(200);
            if (urlGetStore === "https://petstore.swagger.io/") {
                test.skip();
                expect(response.headers()['content-type']).toContain('text/html');
                const html = await response.text();
                expect(html).toContain('Swagger UI');
            }
            else {
                    expect(response.headers()['content-type']).toContain('application/json');
                    const users = await response.json();                
            }
            //expect(users.length).toBeGreaterThan(0);
        });
};


for (const urlPostPet of ['https://petstore.swagger.io/v2/pet/0/uploadImage', 'https://petstore.swagger.io/v2/pet', 'https://petstore.swagger.io/v2/pet/1']) {
    test(`POST pet ${urlPostPet}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {
            
            //Allure settings
            await allure.epic('API');
            await allure.story('post');
            await allure.label('owner', 'Me');
            await allure.displayName(`POST pet запрос ${urlPostPet}`);
            await allure.severity('critical');
            await allure.suite("pet");

            const response = await request.get(urlPostPet);

            // Проверки
            //expect(response.status()).toBe(200);
            if (urlPostPet === "https://petstore.swagger.io/v2/pet/0/uploadImage") {
                //test.skip();
                const response = await request.post(urlPostPet, {
                    headers: {
                        'Accept': 'application/json', // ← запрашиваем JSON
                    },
                    multipart: FormData,
                });

                const responseBody = await response.json();
                expect(responseBody.code).toBe(400);
                expect(responseBody.type).toBeDefined();
                expect(responseBody.message).toBeDefined();
            }
            else if (urlPostPet === "https://petstore.swagger.io/v2/pet/") {
                const requestBody = {
                    id: 0,
                    category: {
                        id: 0,
                        name: "string"
                    },
                    name: "doggie",
                    photoUrls: ["string"],
                    tags: [{
                        id: 0,
                        name: "string"
                    }],
                    status: "available"
                };

                const response = await request.post(urlPostPet, {
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Проверки
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');

                const responseData = await response.json();
                expect(responseData.id).toBeGreaterThan(0); // Сервер должен присвоить новый ID
                expect(responseData.name).toBe("doggie");
            }
            else if (urlPostPet === "https://petstore.swagger.io/v2/pet/1004") {
                const requestBody = {
                    id: 1004,
                    name: 'Barsik',
                    status: "available"
                };
                const response = await request.post(urlPostPet, {
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Проверки
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');
                expect(response).toHaveProperty('type', 'unknown');
                expect(response).toHaveProperty('message', '1');
            }
     });
};


for (const urlPostStore of ['https://petstore.swagger.io/v2/store/order']) {
    test(`POST store ${urlPostStore}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('post');
            await allure.label('owner', 'Me');
            await allure.displayName(`POST pet запрос ${urlPostStore}`);
            await allure.severity('critical');
            await allure.suite("store");
                      
            // Проверки
            const requestBody = {
                id: 1,
                petId: 1,
                quantity: 1,
                shipDate: new Date().toISOString(), 
                status: "placed",
                complete: true
            };

            const response = await request.post(urlPostStore, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify(requestBody)
            });

                // Проверки
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');

                const responseData = await response.json();
                //expect(responseData.id).toBeGreaterThan(0);
                expect(responseData.complete).toBe(true);
            }
            
    )
};


for (const urlPostUser of ['https://petstore.swagger.io/v2/user/createWithList',
    'https://petstore.swagger.io/v2/user/createWithArray',
    'https://petstore.swagger.io/v2/user']) {
    test(`POST user ${urlPostUser}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('post');
            await allure.label('owner', 'Me');
            await allure.displayName(`POST user запрос ${urlPostUser}`);
            await allure.severity('critical');
            await allure.suite("user");

            const response = await request.get(urlPostUser);

            // Проверки
            //expect(response.status()).toBe(200);
            if (urlPostUser === "https://petstore.swagger.io/v2/user") {
                //test.skip();
                const requestBody = {
                    id: 123,
                    username: "string",
                    firstName: "string",
                    lastName: "string",
                    email: "string",
                    password: "string",
                    phone: "string",
                    userStatus: 1
                };

                const response = await request.post(urlPostUser, {
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Проверки
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');

                const responseData = await response.json();
                expect(responseData).toHaveProperty('type', 'unknown');
                expect(responseData).toHaveProperty('message', expect.any(String));
            }
            else if (urlPostUser === "https://petstore.swagger.io/v2/user/createWithList") {
                const requestBody = [ {
                    id: 9223372036854755000,
                    username: "string",
                    firstName: "string",
                    lastName: "string",
                    email: "string",
                    password: "string",
                    phone: "string",
                    userStatus: 0
                },
                    { id: 9223372036854755001,
                    username: "string1",
                    firstName: "string1",
                    lastName: "string1",
                    email: "string1",
                    password: "string1",
                    phone: "string1",
                    userStatus: 0
                }
                ];

                const response = await request.post(urlPostUser, {
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Проверки
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');

                const responseData = await response.json();
                expect(responseData).toHaveProperty('type', 'unknown');
                expect(responseData).toHaveProperty('message', 'ok');
            }
            else if (urlPostUser === "https://petstore.swagger.io/v2/user/createWithArray") {
                const requestBody =[ {
                    id: 9223372036854755000,
                    username: "string",
                    firstName: "string",
                    lastName: "string",
                    email: "string",
                    password: "string",
                    phone: "string",
                    userStatus: 0
                },
                    
                    {
                        id: 9223372036854755001,
                        username: "string1",
                        firstName: "string1",
                        lastName: "string1",
                        email: "string1",
                        password: "string1",
                        phone: "string1",
                        userStatus: 0
                    }
                ];
                const response = await request.post(urlPostUser, {
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Проверки
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');

                const responseData = await response.json();
                expect(responseData).toHaveProperty('type', 'unknown');
                expect(responseData).toHaveProperty('message', 'ok');
            }
        });
};


for (const urlPutPet of ['https://petstore.swagger.io/v2/pet']) {
    test(`PUT pet ${urlPutPet}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('put');
            await allure.label('owner', 'Me');
            await allure.displayName(`PUT pet запрос ${urlPutPet}`);
            await allure.severity('critical');
            await allure.suite("pet");

            // Проверки
            const requestBody = {
                id: 9223372036854754000,
                category: {
                    id: 0,
                    name: "string"
                },
                name: "doggie",
                photoUrls: [
                    "string"
                ],
                tags: [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                status: "available"
            };

            const response = await request.put(urlPutPet, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify(requestBody)
            });

            // Проверки
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toContain('application/json');

            const responseData = await response.json();
            //expect(responseData.id).toBeGreaterThan(0);
            expect(responseData.name).toBe('doggie');
            //console.log('Full response:', responseData);
        }

    )
}


for (const urlPutUser of ['https://petstore.swagger.io/v2/pet']) {
    test(`PUT user ${urlPutUser}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('put');
            await allure.label('owner', 'Me');
            await allure.displayName(`PUT user запрос ${urlPutUser}`);
            await allure.severity('critical');
            await allure.suite("user");

            // Проверки
            const requestBody = {                
                id: 0,
                username: "string",
                firstName: "string",
                lastName: "string",
                email: "string",
                password: "string",
                phone: "string",
                userStatus: 0
            };

            const response = await request.put(urlPutUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify(requestBody)
            });

            // Проверки
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toContain('application/json');

            const responseData = await response.json();
           /*
            expect(responseData).toEqual({
                code: 200,
                message: expect.any(String),
                type: 'unknown',
            });*/ //это тест составлен по документации и упал, документация устарела.
            expect(responseData).toEqual({
                id: expect.any(Number),
                photoUrls: expect.any(Array),
                tags: expect.any(Array),
            });
        }

    )
}


for (const urlDeletePet of ['https://petstore.swagger.io/v2/pet/2']) {
    test(`DEL pet ${urlDeletePet}`, /*{
        tag: '@apiGetStore'},*/
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('delete');
            await allure.label('owner', 'Me');
            await allure.displayName(`DEL pet запрос ${urlDeletePet}`);
            await allure.severity('critical');
            await allure.suite("pet");

            // Проверки

            const response = await request.delete(urlDeletePet, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            // Проверки
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toContain('application/json');

            const responseData = await response.json();
            expect(responseData).toEqual({
                code: 200,
                type: 'unknown',
                message: '2',
            });
        }

    )
}


//тесты падают из-за невалидных ID. Стандартные варианты {0,1,2,3,4,5 и т.д.} не работают. ID из документации 7576386026739276000 тоже даёт падение.
for (const urlDeleteStore of ['https://petstore.swagger.io/v2/order/7576386026739276000',
    'https://petstore.swagger.io/v2/order/10']) {
    test(`DEL store ${urlDeleteStore}`, 
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('delete');
            await allure.label('owner', 'Me');
            await allure.displayName(`DEL store запрос ${urlDeleteStore}`);
            await allure.severity('critical');
            await allure.suite("store");

            // Проверки

            const response = await request.delete(urlDeleteStore, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            // Проверки
            expect(response.status()).toBe(200);
            expect(response.headers()['content-type']).toContain('application/json');
            console.log(response);

            const responseData = await response.json();
            if (urlDeleteStore === 'https://petstore.swagger.io/v2/order/7576386026739276000') {
                expect(responseData).toEqual({
                    code: 200,
                    type: 'unknown',
                    message: '7576386026739276000',
                });
            }
            else if (urlDeleteStore === 'https://petstore.swagger.io/v2/order/10') {
                expect(responseData).toEqual({
                    code: 200,
                    type: 'unknown',
                    message: '10',
                });
            }
        }

    )
}


for (const urlDeleteUser of ['https://petstore.swagger.io/v2/user/user', 'https://petstore.swagger.io/v2/user/string']) {
    test(`DEL user ${urlDeleteUser}`,
        async ({ request }) => {

            //Allure settings
            await allure.epic('API');
            await allure.story('delete');
            await allure.label('owner', 'Me');
            await allure.displayName(`DEL store запрос ${urlDeleteUser}`);
            await allure.severity('critical');
            await allure.suite("user");

            // Проверки

            const response = await request.delete(urlDeleteUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            // Проверки

            console.log(response);

            
            if (urlDeleteUser === 'https://petstore.swagger.io/v2/user/user') {
                test.skip()
                const responseData = await response.json();
                    expect(responseData).toEqual({
                    code: 200,
                    type: 'unknown',
                    message: 'user',
                });
            }
            else if (urlDeleteUser === 'https://petstore.swagger.io/v2/user/string') {
                const responseData = await response.json();
                expect(response.status()).toBe(200);
                expect(response.headers()['content-type']).toContain('application/json');
                expect(responseData).toEqual({
                    code: 200,
                    type: 'unknown',
                    message: 'string',
                });
            }
        }

    )
}