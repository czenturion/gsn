import {act, create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

describe("ProfileStatus component.", () => {
    test("after render <span> should be with correct status", async () => {
        const root = create(<ProfileStatus status="test status" />).root
        const status = await root.findByType("span")
        expect(status.children[0]).toBe("test status")
    })

    test("<span> tag with status should be in component while edit mode false", async () => {
        const root = create(<ProfileStatus status="test statussss" />).root
        const span = await root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("<input> tag shouldn't be in component while edit mode false", async () => {
        const root = create(<ProfileStatus status="test statussss" />).root
        await expect(  () => {
            const input = root.findByType("input")
        }).toThrow()
    })

    test("after click on <span> its should swap on <input>, and last should be with correct status", async () => {
        const root = create(<ProfileStatus status="test statussss" currentProfileAuthUser={true}/>).root
        const span = await root.findByType("span")
        act( () => {
            span.props.onClick()
        })
        const input = await root.findByType("input")
        expect(input.props.defaultValue).toBe("test statussss")
    })

    test("callback should be called", async () => {
        const mockCallback = jest.fn()
        const root = create(<ProfileStatus status="test statussss" currentProfileAuthUser={true} updateStatus={mockCallback}/>).root
        const span = await root.findByType("span")
        act( () => {
            span.props.onClick()
        })
        const input = await root.findByType("input")
        act( () => {
            input.props.onBlur()
        })
        console.log(mockCallback.mock)
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})