def gen_warning(score, warningScore):
    
    warningType = 0
    if(score == 5):
        warningType = 3
    else:
        warningScore = warningScore - score

    if(warningScore <= 0):
        warningType = 1
        warningScore = 12

    return warningType, warningScore
