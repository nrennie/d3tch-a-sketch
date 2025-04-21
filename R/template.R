template_name <- "template"

# make folder in src
new_folder <- file.path("src", template_name)
if (!file.exists(new_folder)) {
    dir.create(new_folder, recursive = TRUE)
    message("Created new folder")
    # copy config
    file.copy(
        from = file.path("R", "template", "config.js"),
        to = new_folder
    )
    # copy and update index.html
    new_html_file <- file.path("src", template_name, "index.html")
    file.create(new_html_file)
    html_txt <- readLines(file.path("R", "template", "index.html"))
    html_txt <- gsub(
        pattern = "template.js",
        replacement = paste0(template_name, ".js"),
        x = html_txt
    )
    writeLines(html_txt, con = new_html_file)
    # copy and update plot.js
    new_js_file <- file.path("src", template_name, "plot.js")
    file.create(new_js_file)
    js_txt <- readLines(file.path("R", "template", "plot.js"))
    js_txt <- gsub(
        pattern = "templatePlot",
        replacement = paste0(template_name, "Plot"),
        x = js_txt
    )
    writeLines(js_txt, con = new_js_file)
    # message
    message("Template contents copied")
}

# make new .js function file
new_js_file2 <- file.path("js", "plotFunctions", paste0(template_name, ".js"))
if (!file.exists(new_js_file2)) {
    file.create(new_js_file2)
    message("Created '.js' file")
    # copy lines to .js file
    js_txt2 <- readLines(file.path("R", "template.js"))
    js_txt2 <- gsub(
        pattern = "templatePlot",
        replacement = paste0(template_name, "Plot"),
        x = js_txt2
    )
    # write to new file
    writeLines(js_txt2, con = new_js_file2)
    message("'template.js' contents copied")
}

