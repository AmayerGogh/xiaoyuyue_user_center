export class SelectHelper {
    static defaultList(): Object[] {
        return [{
            value: "",
            displayText: "Please_Choose"
        },
        {
            value: true,
            displayText: "Yes",
        },
        {
            value: false,
            displayText: "No",
        }];
    }
}