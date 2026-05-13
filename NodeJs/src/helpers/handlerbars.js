const Handlerbars = require("handlebars");

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const validTypes = ["asc", "desc"];

        const currentType =
            field === sort.column && validTypes.includes(sort.type)
                ? sort.type
                : "default";
        const icons = {
            default: "fa-solid fa-arrows-up-down",
            desc: "fa-solid fa-arrow-down",
            asc: "fa-solid fa-arrow-up",
        };
        const types = {
            default: "desc",
            asc: "desc",
            desc: "asc",
        };

        const icon = icons[currentType];
        const type = types[currentType];

        const address = Handlerbars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${address}">
                        <i class="${icon}"></i>
                    </a>`;
        return new Handlerbars.SafeString(output);
    },
};
