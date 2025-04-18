all_folders <- list.dirs(path = ".", recursive = FALSE)
all_folders <- gsub(pattern = "./", replacement = "", all_folders)
all_folders <- all_folders[!(all_folders %in% c(".git", "images"))]

existing_images <- list.files(path = "images")
existing_images <- gsub(pattern = ".png", replacement = "", existing_images)
images_needed <- setdiff(all_folders, existing_images)

if (length(images_needed) >= 1) {
  ids <- paste0("#", tolower(images_needed))
  for (i in seq_len(length(images_needed))) {
    webshot2::webshot(
      url = paste0(images_needed[i], "/index.html"),
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

