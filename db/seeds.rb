# いくつかの講義を作成します
lecture1 = Lecture.create!(title: 'Introduction to Computer Science', lecturer: 'Prof. Alice', faculty: 'Engineering')
lecture2 = Lecture.create!(title: 'Calculus 101', lecturer: 'Prof. Bob', faculty: 'Mathematics')
lecture3 = Lecture.create!(title: 'Modern Art History', lecturer: 'Prof. Charlie', faculty: 'Arts')
lecture4 = Lecture.create!(title: 'Quantum Physics', lecturer: 'Prof. David', faculty: 'Science')
lecture5 = Lecture.create!(title: 'Classical Literature', lecturer: 'Prof. Emily', faculty: 'Literature')

# 講義にレビューを追加します

# それぞれの講義にレビューを追加します
Review.create!(rating: 4, content: 'Great lecture!', lecture_id: lecture1.id)
Review.create!(rating: 5, content: 'Very insightful and engaging.', lecture_id: lecture1.id)

Review.create!(rating: 3, content: 'Difficult but worth it.', lecture_id: lecture2.id)
Review.create!(rating: 2, content: 'The content was a bit too advanced for me.', lecture_id: lecture2.id)

Review.create!(rating: 5, content: 'Incredibly interesting and well taught.', lecture_id: lecture3.id)
Review.create!(rating: 3, content: 'I loved the course content, but the teaching was a bit dry.', lecture_id: lecture3.id)

Review.create!(rating: 5, content: 'Challenging but fascinating!', lecture_id: lecture4.id)
Review.create!(rating: 4, content: 'Highly technical, but Prof. David explains concepts clearly.', lecture_id: lecture4.id)

Review.create!(rating: 4, content: 'Loved reading the classics in this course!', lecture_id: lecture5.id)
Review.create!(rating: 5, content: 'Prof. Emily is an expert in her field and it shows.', lecture_id: lecture5.id)