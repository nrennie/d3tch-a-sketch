force <- FALSE

all_folders <- list.dirs(path = "src/", recursive = FALSE)
all_folders <- gsub(pattern = "src/", replacement = "", all_folders)

if (force) {
  images_needed <- all_folders
} else {
  existing_images <- list.files(path = "images")
  existing_images <- gsub(pattern = ".png", replacement = "", existing_images)
  images_needed <- setdiff(all_folders, existing_images)
}

if (length(images_needed) >= 1 || force) {
  ids <- paste0("#", tolower(images_needed))
  for (i in seq_len(length(images_needed))) {
    webshot2::webshot(
      url = paste0("src/", images_needed[i], "/index.html"),
      file = paste0("images/", images_needed[i], ".png"),
      selector = ids[i],
      expand = c(8, 8, 8, 8),
      quiet = TRUE,
      zoom = 2,
      vwidth = 1000,
      vheight = 1000,
    )
  }
}
