import exp from "constants";
import { create } from "domain";
import { newArrayIntQueue } from "../src/arrayqueue";
import { newLinkedListIntQueue } from "../src/linkedlistqueue.js";

// pick one queue implementation, can run test easily for both, due to subtype polymorphism
// let createQueue = newLinkedListIntQueue
let createQueue = newArrayIntQueue

// simple test
test("newly created list should be empty", () => {
    expect(createQueue().isEmpty).toBeTruthy()
})

let param = [5, 10, 1000000]
// parameterized test, apply to each value of the parameter
test.each(param)("enqueued number %d can be dequeued", (nr) => {
    const queue = createQueue()
    queue.enqueue(nr)
    expect(queue.peek()).toBe(nr)
})

// can nest tests with shared descriptions for better readability
describe("queue length", ()=> {
    test("1 entry", ()=>{
        const queue = createQueue()
        queue.enqueue(5)
        expect(queue.size()).toBe(1)
    })

    test("11 entries", ()=>{
        const queue = createQueue()
        for (let i =0;i<11;i++)
            queue.enqueue(i)
        expect(queue.size()).toBe(11)
    })
})


describe("clear queue", ()=> {
    test("no entry", ()=>{
        const queue = createQueue()
        queue.clear()
        expect(queue.isEmpty())
    })

    test("2 entry", ()=>{
        const queue = createQueue()
        queue.enqueue(1)
        queue.enqueue(2)
        queue.clear()
        expect(queue.isEmpty())
    })
})

describe("entered number can be dequeued in correct order", ()=>{
    test("1 entry", ()=>{
        const queue = createQueue()
        queue.enqueue(5)
        expect(queue.dequeue()).toBe(5)
    })

    test("11 entry", ()=>{
        const queue = createQueue()
        for (let i =0;i<11;i++)
            queue.enqueue(i)
        for (let i =0;i<11;i++)
            expect(queue.dequeue()).toBe(i)
    })
})

describe("queue isempty", ()=> {
    test("no entry", ()=>{
        const queue = createQueue()
        expect(queue.isEmpty()).toBe(true)
    })

    test("1 entry", ()=>{
        const queue = createQueue()
        queue.enqueue(2)
        expect(queue.isEmpty()).toBe(false)
    })
})

describe("peek queue", ()=>{
    test("no entry", ()=>{
        const queue = createQueue()
        expect(queue.peek()).toBe(null)
    })

    test('1 entry', ()=>{
        const queue = createQueue()
        queue.enqueue(3)
        expect(queue.peek()).toBe(3)
    })

    test('3 entry', ()=>{
        const queue = createQueue()
        for (let i =0;i<3;i++)
            queue.enqueue(i)
        expect(queue.peek()).toBe(2)
    })
})