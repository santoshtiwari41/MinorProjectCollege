export interface Students{
    "crn": string,
    "name": string,
    "batch": {
        "name": string,
        "department": {
            "name": string
        }
    },
    avatar?: string
}